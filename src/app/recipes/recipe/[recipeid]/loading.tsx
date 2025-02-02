import { Spinner } from "react-bootstrap";

export default async function Loading() {
    return(
        <main style={{height:"80vh"}} className="d-flex justify-content-center align-items-center">
            <Spinner />
            <p className="h1">Loading content</p>
        </main>
    )
}