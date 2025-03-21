export default class APIRequest {
    static async sendClick(body) {
        try {
            const response = await fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: body})
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();

            console.log(data.data);

        } catch (error) {
            console.error(error.message);
        }
    }
}