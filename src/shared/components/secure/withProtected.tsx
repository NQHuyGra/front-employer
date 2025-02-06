import ProtectedRoute from "./ProtectedRoute";

export default function withProtected(Component: React.FC) {

    return () => (
        <ProtectedRoute>
            <Component/>
        </ProtectedRoute>
    )
}