const example_1 = `<nav class="bg-gray-800 p-4">
  <div class="flex items-center justify-between">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">My app</span>
    </div>
    <div class="block lg:hidden">
      <button id="menu-toggle" class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div class="hidden lg:block">
      <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4">
        Home
      </a>
      <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4">
        About
      </a>
      <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300">
        Contact
      </a>
    </div>
  </div>
</nav>
`;

const example_2 = `<div class="max-w-sm rounded overflow-hidden shadow-lg">
<img class="w-full" src="img/producto.jpg" alt="Producto">
<div class="px-6 py-4">
  <div class="font-bold text-xl mb-2">Product name</div>
  <p class="text-gray-700 text-base">
    loren ipsum dolor sit amet consectetur
  </p>
</div>
<div class="px-6 pt-4 pb-2">
  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Category</span>
  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#Category2</span>
</div>
</div>
`;

const example_3 = `<div class="overflow-x-auto">
<table class="min-w-full divide-y divide-gray-200">
  <thead class="bg-gray-50">
    <tr>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr>
      <td class="px-6 py-4 whitespace-nowrap">User 1</td>
      <td class="px-6 py-4 whitespace-nowrap">User1@example.com</td>
      <td class="px-6 py-4 whitespace-nowrap">Admin</td>
    </tr>
    <tr>
      <td class="px-6 py-4 whitespace-nowrap">User 2</td>
      <td class="px-6 py-4 whitespace-nowrap">User2@example.com</td>
      <td class="px-6 py-4 whitespace-nowrap">User</td>
    </tr>
  </tbody>
</table>
</div>
`;

export default { example_1, example_2, example_3 };
