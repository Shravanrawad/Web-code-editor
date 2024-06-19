
const languagecode = {
    cpp: 53,
    python: 92,
    java: 91,
    javascript: 93
}

export async function makesubmission({ code, language, callback, stdin }) {
    const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '6e97476c6cmsh07897574844bbdfp1c4dafjsn84d84a9f4ec8',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            language_id: languagecode[language],
            source_code: btoa(code),
            stdin: btoa(stdin)
        })
    }
    try {
        console.log('Submitting code to Judge0 API...');
        callback({ apiStatus: 'loading' });
        const response = await fetch(url, options);
        const data = await response.json();
        const tokenId = data.token;
        console.log('Received token:', tokenId);
        let statuscode = 1;
        let responsesubmission;

        while (statuscode === 1 || statuscode === 2) {
            try {
                responsesubmission = await getSubmission(tokenId);
                statuscode = responsesubmission.status.id;
                console.log('Submission status:', statuscode);
            } catch (error) {
                console.error('Error fetching submission:', error);
                callback({ apiStatus: 'error', message: JSON.stringify(error) });
                return;
            }
        }

        if (responsesubmission) {
            callback({ apiStatus: 'success', data: responsesubmission });
        }
    } catch (error) {
        console.error('Error making submission:', error);
        callback({ apiStatus: 'error', message: JSON.stringify(error) });
    }
}

export async function getSubmission(tokenId) {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6e97476c6cmsh07897574844bbdfp1c4dafjsn84d84a9f4ec8',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('Fetched submission result:', result);
        return result;
    } catch (error) {
        console.error('Error fetching submission result:', error);
        throw error;
    }
}
