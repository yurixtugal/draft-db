export default function DiscoverPage() {
  return (
    <div className="bg-gray-900 flex flex-wrap items-center justify-center min-h-screen py-2 text-white px-4 font-sans">
      <div className="card bg-white text-black m-4 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-2">Tables</h2>
        <p className="text-xl">Number of tables: 10</p>
      </div>
      <div className="card bg-white text-black m-4 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-2">Relations</h2>
        <p className="text-xl">Number of relations: 5</p>
      </div>
      <div className="card bg-white text-black m-4 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-2">Scripts</h2>
        <p className="text-xl">Number of scripts: 3</p>
      </div>
      <section className="bg-gray-800 text-white m-4 p-8 shadow-lg rounded-lg w-full">
    <h2 className="text-3xl font-semibold mb-2">Models</h2>
    <p className="text-xl">
        Here you can explore our different models. We currently have 4 models
        available.
    </p>
</section>
<div className="grid grid-cols-3 gap-4">
    <div className="card bg-white text-black m-4 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-2">E-commerce Model</h2>
        <p className="text-xl">
            This model is designed for e-commerce applications. It includes tables
            for products, orders, customers, and more.
        </p>
    </div>
    <div className="card bg-white text-black m-4 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-2">Authorizations Model</h2>
        <p className="text-xl">
            This model is designed for managing user authorizations. It includes
            tables for users, roles, permissions, and more.
        </p>
    </div>
    <div className="card bg-white text-black m-4 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-2">Inventory Model</h2>
        <p className="text-xl">
            This model is designed for inventory management. It includes tables
            for items, warehouses, transactions, and more.
        </p>
    </div>
    <div className="card bg-white text-black m-4 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-2">Sales Model</h2>
        <p className="text-xl">
            This model is designed for sales management. It includes tables for
            sales orders, customers, products, and more.
        </p>
    </div>
</div>
</div>
  );
}
