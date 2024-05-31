import { Container, VStack, Box, Text, Heading, Flex, Button, HStack, Input } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { usePosts, useAddPost, useUpdatePost, useDeletePost } from '../integrations/supabase/index.js';

const AdminPosts = () => {
  const navigate = useNavigate();
  const { data: posts, isLoading, error } = usePosts();
  const addPostMutation = useAddPost();
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();
  const [editPostId, setEditPostId] = useState(null);
  const [editPostContent, setEditPostContent] = useState("");

  const handleEdit = (post) => {
    setEditPostId(post.id);
    setEditPostContent(post.title);
  };

  const handleSave = () => {
    updatePostMutation.mutate({ id: editPostId, title: editPostContent, body: editPostContent });
    setEditPostId(null);
    setEditPostContent("");
  };

  const handleDelete = (postId) => {
    deletePostMutation.mutate(postId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <Container maxW="container.lg" p={4}>
      <VStack spacing={8} align="stretch">
        <Flex as="nav" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
          <Heading size="lg">Manage Posts</Heading>
        </Flex>
        <Button colorScheme="blue" onClick={() => navigate(-1)}>Back</Button>

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
                  <Text>{post.title}</Text>
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