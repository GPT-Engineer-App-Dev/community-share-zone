import { Container, VStack, Box, Text, Input, Button, HStack, Flex, Heading, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { usePosts, useAddPost, useUpdatePost } from '../integrations/supabase/index.js';

const Index = () => {
  const { data: posts, isLoading, error } = usePosts();
  const addPostMutation = useAddPost();
  const updatePostMutation = useUpdatePost();
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      addPostMutation.mutate({ title: newPost, body: newPost, likes_count: 0 });
      setNewPost("");
    }
  };

  const handleLike = (postId) => {
    const post = posts.find(post => post.id === postId);
    updatePostMutation.mutate({ ...post, likes_count: post.likes_count + 1 });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <Container maxW="container.lg" p={4}>
      <VStack spacing={8} align="stretch">
        <Flex as="nav" bg="brand.700" color="white" p={4} justifyContent="space-between" alignItems="center">
          <Heading size="lg">Public Post Board</Heading>
        <Button as={Link} to="/admin" colorScheme="brand">Admin Panel</Button>
        </Flex>

        <Box as="main">
          <VStack spacing={4}>
            <Box w="100%" p={4} borderWidth="1px" borderRadius="lg">
              <Heading size="md" mb={4}>Create a Post</Heading>
              <HStack>
                <Input
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <Button colorScheme="brand" onClick={handlePostSubmit}>Post</Button>
              </HStack>
            </Box>

            <VStack w="100%" spacing={4}>
              {posts.map((post) => (
                <Box key={post.id} w="100%" p={4} borderWidth="1px" borderRadius="lg">
                  <Text>{post.title}</Text>
                  <HStack mt={2} justifyContent="space-between">
                    <Text>{post.likes_count} {post.likes_count === 1 ? "Like" : "Likes"}</Text>
                    <IconButton
                      icon={<FaThumbsUp />}
                      colorScheme="brand"
                      onClick={() => handleLike(post.id)}
                      aria-label="Like post"
                    />
                  </HStack>
                </Box>
              ))}
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;