const example_1 = `
<container className="flex items-center justify-between">
  <button className="flex items-center px-3 py-2 hover:text-white">
    Button
  </button>
  <div className="hidden">
    <a href="#" className="block mt-4 text-white hover:text-gray-300">
      Contact
    </a>
  </div>
</container>
`;

const example_2 = `
<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Product name</div>
    <p className="text-gray-700 text-base">
      loren ipsum dolor sit amet consectetur
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Category</span>
    <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Category2</span>
  </div>
</div>
`;

const example_3 = `
<div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">Admin</td>
        <td className="px-6 py-4 whitespace-nowrap">admin@example.com</td>
        <td className="px-6 py-4 whitespace-nowrap">Admin</td>
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">User</td>
        <td className="px-6 py-4 whitespace-nowrap">User@example.com</td>
        <td className="px-6 py-4 whitespace-nowrap">User</td>
      </tr>
    </tbody>
  </table>
</div>
`;

export default { example_1, example_2, example_3 };
