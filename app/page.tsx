import { db } from '@/lib/db'

export default async function Home() {
  
  return (
    <div className="p-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to Draft-DB</h1>
        <p className="mb-8">This is a tool to generate database models.</p>
        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside">
                <li className="mb-2">Generate database models</li>
                <li className="mb-2">Visualize your database structure</li>
                <li className="mb-2">Export your models to various database languages</li>
            </ul>
        </section>
        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">AI-Powered</h2>
            <p>Draft-DB uses advanced AI algorithms to generate database models. Just provide your requirements, and our AI will do the rest!</p>
        </section>
        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Get Started</h2>
            <p>To get started, create a new model or import an existing one.</p>
        </section>
        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:info@draft-db.com" className="text-blue-500">info@draft-db.com</a>.</p>
        </section>
        <section>
            <h2 className="text-2xl font-semibold mb-2">About Us</h2>
            <p>We are a team of passionate developers dedicated to making database modeling easy and accessible for everyone.</p>
        </section>
    </div>
  )
} 