import Sidebar from "../../components/Sidebar";

export default function index() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="grid place-items-center bg-[#E6DEDA] h-screen flex-1">
                <h3 className="text-xl">Choose someone to message</h3>
            </div>
        </div>
    )
}
