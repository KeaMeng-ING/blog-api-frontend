export default function BlogGrid(props) {
  const datas = props.posts;

  if (!datas || datas.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {datas.map((post) => (
        <div
          key={post.id}
          className="bg-gray-100 dark:bg-black rounded-lg overflow-hidden"
        >
          <div className="h-48 bg-gray-200 dark:bg-gray-800">
            <img
              src={post.imageUrl || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                {post.categoryName || "General"}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                •
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {post.readTime}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              {post.subtitle}
            </p>
            <p className="mb-4 text-sm">{post.excerpt}</p>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 mr-3"></div>
              <div>
                <div className="font-medium text-sm">{post.authorName}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">
                  {post.date}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
