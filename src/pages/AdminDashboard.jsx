import { Container, VStack, Box, Text, Heading, Flex, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.lg" p={4}>
      <VStack spacing={8} align="stretch">
        <Flex as="nav" bg="brand.700" color="white" p={4} justifyContent="space-between" alignItems="center">
          <Heading size="lg">Admin Dashboard</Heading>
        <Button colorScheme="brand" onClick={() => navigate(-1)}>Back</Button>
        </Flex>

        <Box as="main">
          <VStack spacing={4}>
            <Box w="100%" p={4} borderWidth="1px" borderRadius="lg">
              <Heading size="md" mb={4}>Overview</Heading>
              <Text>Welcome to the admin dashboard. Use the links below to manage posts and users.</Text>
            </Box>

            <Box w="100%" p={4} borderWidth="1px" borderRadius="lg">
              <Heading size="md" mb={4}>Manage Posts</Heading>
              <Button as={Link} to="/admin/posts" colorScheme="brand">Go to Posts</Button>
            </Box>

            <Box w="100%" p={4} borderWidth="1px" borderRadius="lg">
              <Heading size="md" mb={4}>Manage Users</Heading>
              <Button as={Link} to="/admin/users" colorScheme="brand">Go to Users</Button>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default AdminDashboard;