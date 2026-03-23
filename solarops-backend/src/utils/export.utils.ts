// utils/export.utils.ts
import { Response } from "express";
import { Parser } from "json2csv"; // npm i json2csv

export const exportCSV = (res: Response, data: any[]) => {
    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("report.csv");
    res.send(csv);
};