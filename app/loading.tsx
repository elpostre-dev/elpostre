export default function GlobalLoading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/75 backdrop-blur-[1px]">
            <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-mainRojo-100" />
                <p className="text-sm text-gray-700">Cargando...</p>
            </div>
        </div>
    );
}
