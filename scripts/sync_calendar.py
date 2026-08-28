#!/usr/bin/env python3
import json, re, urllib.request
from datetime import datetime, timezone
from pathlib import Path

ICS_URL = "https://calendar.google.com/calendar/ical/85f9e36c66e24ad1194548ae7ba9b7db6f8e38465a31b51cc59a07cc6be54472%40group.calendar.google.com/public/basic.ics"
OUT = Path("assets/data/events.json")

def unfold(text):
    return re.sub(r"\r?\n[ \t]", "", text)

def unescape(v):
    return (v.replace("\\n","\n").replace("\\N","\n")
             .replace("\\,",",").replace("\\;",";").replace("\\\\","\\"))

def parse_dt(line):
    left, value = line.split(":",1)
    all_day = "VALUE=DATE" in left or (len(value)==8 and "T" not in value)
    if all_day:
        dt = datetime.strptime(value[:8], "%Y%m%d").replace(tzinfo=timezone.utc)
        return dt.isoformat(), True
    if value.endswith("Z"):
        dt = datetime.strptime(value, "%Y%m%dT%H%M%SZ").replace(tzinfo=timezone.utc)
    else:
        # Google public ICS local times may include TZID. Preserve as naive then mark UTC
        # for static display consistency; event ordering remains correct.
        value = value[:15]
        dt = datetime.strptime(value, "%Y%m%dT%H%M%S").replace(tzinfo=timezone.utc)
    return dt.isoformat(), False

req = urllib.request.Request(ICS_URL, headers={"User-Agent":"ManeChainCalendarSync/1.0"})
with urllib.request.urlopen(req, timeout=30) as r:
    text = unfold(r.read().decode("utf-8","replace"))

events=[]
for block in re.findall(r"BEGIN:VEVENT(.*?)END:VEVENT", text, flags=re.S):
    fields={}
    start=end=None
    all_day=False
    for raw in block.strip().splitlines():
        line=raw.strip()
        if line.startswith("DTSTART"):
            start, all_day = parse_dt(line)
        elif line.startswith("DTEND"):
            end, _ = parse_dt(line)
        elif line.startswith("SUMMARY"):
            fields["title"]=unescape(line.split(":",1)[1])
        elif line.startswith("LOCATION"):
            fields["location"]=unescape(line.split(":",1)[1])
        elif line.startswith("DESCRIPTION"):
            desc=unescape(line.split(":",1)[1]).strip()
            # Keep event cards readable.
            fields["description"]=desc[:280]
        elif line.startswith("UID"):
            fields["uid"]=line.split(":",1)[1]
    if start:
        events.append({
            "uid": fields.get("uid",""),
            "title": fields.get("title","Mane Chain Event"),
            "start": start,
            "end": end or start,
            "allDay": all_day,
            "location": fields.get("location",""),
            "description": fields.get("description","")
        })

events.sort(key=lambda e:e["start"])
payload={
    "source": ICS_URL,
    "updated": datetime.now(timezone.utc).isoformat(),
    "events": events
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(payload,indent=2,ensure_ascii=False),encoding="utf-8")
print(f"Wrote {len(events)} events to {OUT}")
