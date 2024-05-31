import { Container, VStack, Box, Text, Input, Button, HStack, Flex, Heading, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setPosts([{ content: newPost, id: Date.now(), likes: 0 }, ...posts]);
      setNewPost("");
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  return (
    <Container maxW="container.lg" p={4}>
      <VStack spacing={8} align="stretch">
        <Flex as="nav" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
          <Heading size="lg">Public Post Board</Heading>
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
                <Button colorScheme="blue" onClick={handlePostSubmit}>Post</Button>
              </HStack>
            </Box>

            <VStack w="100%" spacing={4}>
              {posts.map((post) => (
                <Box key={post.id} w="100%" p={4} borderWidth="1px" borderRadius="lg">
                  <Text>{post.content}</Text>
                  <HStack mt={2} justifyContent="space-between">
                    <Text>{post.likes} {post.likes === 1 ? "Like" : "Likes"}</Text>
                    <IconButton
                      icon={<FaThumbsUp />}
                      colorScheme="blue"
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