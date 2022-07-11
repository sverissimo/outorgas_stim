import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
//import moment from 'moment'

export const exportToXlsx = (fileName: string, data: any) => {

    const
        fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        fileExtension = '.xlsx'

    const arrayOfArrayCsv = data.split("\n").map((row: string) => {
        row = row.replaceAll('"', '')
        return row.split(",")
    })

    const ws = XLSX.utils.aoa_to_sheet(arrayOfArrayCsv)
    ws['!cols'] = Array(arrayOfArrayCsv[0].length).fill(null).map((e) => ({ wch: 15 }))
    const
        wb = {
            Sheets: { [fileName.replace('/', '_')]: ws },
            SheetNames: [fileName.replace('/', '_')]
        }
        , excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        , data2 = new Blob([excelBuffer], { type: fileType })

    FileSaver.saveAs(data2, fileName + fileExtension)
}
