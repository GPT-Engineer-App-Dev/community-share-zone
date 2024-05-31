import { Container, VStack, Box, Text, Heading, Flex, Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";

const AdminPosts = () => {
  const [posts, setPosts] = useState([
    { id: 1, content: "First post" },
    { id: 2, content: "Second post" },
  ]);
  const [editPostId, setEditPostId] = useState(null);
  const [editPostContent, setEditPostContent] = useState("");

  const handleEdit = (post) => {
    setEditPostId(post.id);
    setEditPostContent(post.content);
  };

  const handleSave = () => {
    setPosts(posts.map(post => post.id === editPostId ? { ...post, content: editPostContent } : post));
    setEditPostId(null);
    setEditPostContent("");
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <Container maxW="container.lg" p={4}>
      <VStack spacing={8} align="stretch">
        <Flex as="nav" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
          <Heading size="lg">Manage Posts</Heading>
        </Flex>

        <Box as="main">
          <VStack spacing={4}>
            {posts.map((post) => (
              <Box key={post.id} w="100%" p={4} borderWidth="1px" borderRadius="lg">
                {editPostId === post.id ? (
                  <HStack>
                    <Input
                      value={editPostContent}
                      onChange={(e) => setEditPostContent(e.target.value)}
                    />
                    <Button colorScheme="blue" onClick={handleSave}>Save</Button>
                  </HStack>
                ) : (
                  <Text>{post.content}</Text>
                )}
                <HStack mt={2}>
                  <Button size="sm" colorScheme="yellow" onClick={() => handleEdit(post)}>Edit</Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDelete(post.id)}>Delete</Button>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default AdminPosts;