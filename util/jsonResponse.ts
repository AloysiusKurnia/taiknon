/**
 * A utility function to create a JSON response.
 *
 * @param data - The data to be converted to JSON.
 * @param status - The status code of the response. Default is 200.
 * @return A Response object with the JSON data and headers set.
 */
export default function jsonResponse<T>(data: T, status = 200) {
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
        status,
    });
}