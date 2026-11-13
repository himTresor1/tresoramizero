"use client";

import type { SimName } from "@/content/case-studies/types";
import { ProductSim } from "./ProductSim";
import { NotFoundSim, ClearanceSim, ConnectorsSim, WorkflowSim, OrbSim } from "./SmallSims";

export function Sim({ name }: { name: SimName }) {
  switch (name) {
    case "product":
      return <ProductSim />;
    case "not-found":
      return <NotFoundSim />;
    case "clearance":
      return <ClearanceSim />;
    case "connectors":
      return <ConnectorsSim />;
    case "workflow":
      return <WorkflowSim />;
    case "orb":
      return <OrbSim />;
  }
}

export { BrandFigure, IsoFigure } from "./SmallSims";
