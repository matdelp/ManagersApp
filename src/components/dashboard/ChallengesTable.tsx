import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Challenge } from "./ChallengesTable.container";

type ChallengesTableProps = {
  items: Challenge[];
};

export const ChallengesTable: React.FC<ChallengesTableProps> = ({ items }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {items.map((item) => (
          <TableBody key={item.id}>
            <TableRow>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.level}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </>
  );
};
