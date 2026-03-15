// utils/export.utils.ts
import { Response } from "express";
import { Parser } from "json2csv"; // npm i json2csv
import PDFDocument from "pdfkit"; // npm i pdfkit

export const exportCSV = (res: Response, data: any[]) => {
    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("report.csv");
    res.send(csv);
};

export const exportPDF = (res: Response, data: any[]) => {
    const doc = new PDFDocument();
    res.header("Content-Type", "application/pdf");
    res.attachment("report.pdf");

    doc.pipe(res);

    data.forEach((row) => {
        doc.text(JSON.stringify(row));
        doc.moveDown();
    });

    doc.end();
};