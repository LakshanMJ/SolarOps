// utils/export.utils.ts
import { Response } from "express";
import { Parser } from "json2csv"; // npm i json2csv
import PDFDocument from "pdfkit"; // npm i pdfkit
import puppeteer from "puppeteer";

export const exportCSV = (res: Response, data: any[]) => {
    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("report.csv");
    res.send(csv);
};

// export const exportPDF = (res: Response, data: any[]) => {
//     console.log(data,'DATAAAAAAAA')
//     const doc = new PDFDocument();
//     res.header("Content-Type", "application/pdf");
//     res.attachment("report.pdf");

//     doc.pipe(res);

//     data.forEach((row) => {
//         doc.text(JSON.stringify(row));
//         doc.moveDown();
//     });

//     doc.end();
// };

// export const exportPDF = async (res: Response, data: any) => {

//   const html = renderToStaticMarkup(
//     <FleetPerformanceReport data={data} />
//   );

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.setContent(html);

//   const pdf = await page.pdf({
//     format: "A4",
//     printBackground: true
//   });

//   await browser.close();

//   res.set({
//     "Content-Type": "application/pdf",
//     "Content-Disposition": "attachment; filename=report.pdf"
//   });

//   res.send(pdf);
// };