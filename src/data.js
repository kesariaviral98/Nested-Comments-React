const commentsData = [
  {
    id: 1,
    author: "Alice",
    text: "React's component model makes nested UIs like this surprisingly clean to implement.",
    likes: 4,
    createdAt: "2025-05-20T09:15:00Z",
    children: [
      {
        id: 2,
        author: "Bob",
        text: "Agreed! Recursive components are a neat trick once you get your head around them.",
        likes: 2,
        createdAt: "2025-05-20T09:45:00Z",
        children: [
          {
            id: 3,
            author: "Alice",
            text: "Exactly — and since each Comment renders its own children, the depth is unlimited.",
            likes: 1,
            createdAt: "2025-05-20T10:00:00Z",
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 4,
    author: "Charlie",
    text: "Does this persist across page reloads? I don't see any localStorage usage.",
    likes: 0,
    createdAt: "2025-05-21T14:00:00Z",
    children: [
      {
        id: 5,
        author: "Bob",
        text: "Not yet — it's all in-memory state right now. A backend or localStorage would fix that.",
        likes: 3,
        createdAt: "2025-05-21T14:30:00Z",
        children: []
      }
    ]
  }
];

export default commentsData;
