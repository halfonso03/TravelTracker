import { useState } from "react";
import agent from "../agent";

export const useReports = () => {

    const [loading, setLoading] = useState(false);

    async function getReport() {

        try {
            setLoading(true);

            const response = await agent.get('/reports/summary')
            const data = await response.data;
            const base64String = data.byteArray;
            const binaryString = atob(base64String); // Decode Base64
            const byteArray = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                byteArray[i] = binaryString.charCodeAt(i);
            }

            const blob = new Blob([byteArray], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const blobUrl = URL.createObjectURL(blob);

            const aTag = document.createElement('a');
            aTag.href = blobUrl;
            aTag.download = 'filename.xlsx'; // Replace 'filename.ext' with your desired file name and extension
            aTag.click();

        } catch (error) {
            console.log('error', error)
        }
        finally {
            setLoading(false);
        }

        // fetch(import.meta.env.VITE_API_URL + '/reports')
        //     .then((response) => response.json())
        //     .then((data) => {
        //         const base64String = data.byteArray;
        //         const binaryString = atob(base64String); // Decode Base64
        //         const byteArray = new Uint8Array(binaryString.length);
        //         for (let i = 0; i < binaryString.length; i++) {
        //             byteArray[i] = binaryString.charCodeAt(i);
        //         }

        //         const blob = new Blob([byteArray], {
        //             type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        //         });
        //         const blobUrl = URL.createObjectURL(blob);

        //         const aTag = document.createElement('a');
        //         aTag.href = blobUrl;
        //         aTag.download = 'filename.xlsx'; // Replace 'filename.ext' with your desired file name and extension
        //         aTag.click();
        //     })
        //     .catch((error) => console.error('Error:', error));
    }



    const emailReport = async (email: string, reportPath: string) => {
        await agent.get('/reports/email', {
            params: {
                email, reportPath
            }
        })
    }

    return { getReport, loadingReport: loading, emailReport }

}