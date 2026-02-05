import React from "react";
import { GraphMeta } from "@/lib/autogpt-server-api";
import { FlowRun } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment/moment";
import { FlowRunStatusBadge } from "@/components/monitor/FlowRunStatusBadge";

export const FlowRunsList: React.FC<{
  flows: GraphMeta[];
  runs: FlowRun[];
  className?: string;
  selectedRun?: FlowRun | null;
  onSelectRun: (r: FlowRun) => void;
}> = ({ flows, runs, selectedRun, onSelectRun, className }) => (
  <Card className={className}>
    <CardHeader className="pb-3">
      <CardTitle className="text-base font-semibold tracking-tight">Runs</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[36%]">Agent</TableHead>
            <TableHead>Started</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {runs.map((run) => (
            <TableRow
              key={run.id}
              className="cursor-pointer transition-colors hover:bg-muted/60"
              onClick={() => onSelectRun(run)}
              data-state={selectedRun?.id == run.id ? "selected" : null}
            >
              <TableCell className="font-medium">
                {flows.find((f) => f.id == run.graphID)!.name}
              </TableCell>
              <TableCell>{moment(run.startTime).format("HH:mm")}</TableCell>
              <TableCell>
                <FlowRunStatusBadge status={run.status} />
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatDuration(run.duration)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

function formatDuration(seconds: number): string {
  return (
    (seconds < 100 ? seconds.toPrecision(2) : Math.round(seconds)).toString() +
    "s"
  );
}

export default FlowRunsList;
