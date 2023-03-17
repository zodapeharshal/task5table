import { useEffect, useState } from "react";

const Table = ({ rowId, pId, jsondata, tablength }) => {
    const [data, setData] = useState(null);
    const [childData, setChildData] = useState(null);
    const [open, setOpen] = useState(false);
    const [cId, setCid] = useState(null) ;
    const extractData = () => {
        var reqdata = [];
        jsondata &&
            jsondata.map((jd) => {
                if (String(jd.parentRowId) === String(pId)) {
                    reqdata.push(jd);
                }
            });
        setData(reqdata);
    };

    useEffect(() => {
        extractData();
    }, [jsondata]);


    const handleClick = (parentID) => {
         
        setOpen(parentID);
        extractData()
    };

    return (
        <>
            {data &&
                data.map((row) => {
                    return (
                        <>
                            <tr key={row.rowItemId} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th
                                    onClick={() => handleClick(row.rowItemId)}
                                    className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}
                                    style={{ paddingLeft: tablength + 10 }}
                                >
                                    {row.lineItemDescription}
                                </th>
                                {Object.entries(row.columnValue).map(
                                    ([key, value], idx) => {
                                        return (
                                            <td key={`${row.rowItemId}-cell-td-${idx}`} className="px-6 py-4">
                                                {value.split("|")[0]}
                                            </td>
                                        );
                                    }
                                )}
                            </tr>
                            {open===row.rowItemId && (
                                <Table
                                    rowId={row.rowItemId}
                                    pId={row.rowItemId}
                                    jsondata={jsondata}
                                    tablength={tablength + 20}
                                ></Table>
                            )}
                        </>
                    );
                })}
        </>
    );
};
export default Table;
