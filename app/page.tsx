export default function Page() {
    return (
      <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen py-2 text-white px-4 font-sans">
          <section className="mb-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">Welcome to Our App</h2>
              <p>Experience the best of technology with our innovative solutions.</p>
          </section>
          <section className="mb-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">AI-Powered</h2>
              <p>Our app uses advanced AI algorithms to provide you with the best service.</p>
          </section>
          <section className="mb-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">Get Started</h2>
              <p>To get started, simply open your web browser and visit our website. No downloads required.</p>
          </section>
          <section className="mb-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
              <p>If you have any questions, feel free to reach out to us at <a href="mailto:info@ourapp.com" className="text-blue-500">info@ourapp.com</a>.</p>
          </section>
          <section className="mb-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">About Us</h2>
              <p>We are a team of passionate developers dedicated to bringing you the best digital experience.</p>
          </section>
      </div>
    );
  }