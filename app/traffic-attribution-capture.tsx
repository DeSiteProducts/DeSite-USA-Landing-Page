"use client";

import { useEffect } from "react";
import { getVisitAttribution } from "./lib/traffic-attribution";

export default function TrafficAttributionCapture() {
  useEffect(() => {
    getVisitAttribution();
  }, []);
  return null;
}
