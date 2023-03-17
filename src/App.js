import "./App.css";
import Table from "./Components/Table";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState(null);
    const [headers, setHeaders] = useState(null);
    
    const getData = () => {
        axios({
            method: "post",
            url: "http://164.52.211.233:5010/api/v1/UiReq/GetAsReportedData",
            data: {
                requestToken: "ReactUI- Wed, 08 Mar 2023 05:38:59 GMT",
                inputData: {
                    documentId: 65631,
                    jsonTableId: 101100,
                },
            },
        }).then((res) => {
            setHeaders(res.data.data.columnnames);
            setData(res.data.data.asReportedData);
        });
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Name</th>
                        {headers &&
                            headers.map((head, idx) => {
                                return <th key={`headers-th-${idx}`} className="px-6 py-3">{head}</th>;
                            })}
                    </tr>
                </thead>
                <tbody>
                    {
                        <Table
                            pId={-1}
                            jsondata={data}
                            headers={headers}
                            tablength={1}
                        />
                    }
                </tbody>
            </table>
        </div>
    );
}

export default App;
