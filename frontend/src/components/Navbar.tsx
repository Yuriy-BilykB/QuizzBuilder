import Link from "next/link";

const Navbar = () => {
    return (
       <nav className="glass sticky top-0 z-50 mx-4 mt-4 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-3">
                    <div className="w-10 h-10 gradient-bg-primary rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl">Q</span>
                    </div>
                    <span className="gradient-text text-xl font-bold">Quiz Builder</span>
                </Link>

                <ul className="flex items-center space-x-6">
                    <li>
                        <Link href="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/quizzes" className="nav-link">
                            Quizzes
                        </Link>
                    </li>
                    <li>
                        <Link href="/create" className="btn btn-secondary">
                            Create Quiz
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
       </nav>
    )
}

export default Navbar;