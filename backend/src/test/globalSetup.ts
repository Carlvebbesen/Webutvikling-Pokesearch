import { useTestServer } from "./utils/useTestServer"

export default async () => {
    const { startServer } = await useTestServer();
    process.env.SERVER_URI = await startServer();
}
