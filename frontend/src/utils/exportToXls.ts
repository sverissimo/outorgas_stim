import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


export const jsonToXlsx = (fileName: string, data: any) => {
    const
        ws = XLSX.utils.json_to_sheet(data)
        , remainingKeys = Object.keys(data[0]).slice(2).map((e) => ({ wch: Math.max(e.length, 8) }))

    ws['!cols'] = [{ wch: 50 }, { wch: 18 }, ...remainingKeys]
    exportToXlsx(fileName, ws)
}


export const csvToXlsx = (fileName: string, data: any) => {

    const arrayOfArrayCsv = data.split("\n").map((row: string) => {
        row = row.replaceAll('"', '')
        return row.split(",")
    })

    const ws = XLSX.utils.aoa_to_sheet(arrayOfArrayCsv)
    ws['!cols'] = Array(arrayOfArrayCsv[0].length).fill(null).map((e) => ({ wch: 15 }))
    exportToXlsx(fileName, ws)
}

export const exportToXlsx = (fileName: string, ws: XLSX.WorkSheet) => {

    fileName = fileName.replaceAll('/', '_')

    const
        fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        , fileExtension = '.xlsx'
        , wb = {
            Sheets: { [fileName]: ws },
            SheetNames: [fileName]
        }
        , excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        , data2 = new Blob([excelBuffer], { type: fileType })

    FileSaver.saveAs(data2, fileName + fileExtension)
}

