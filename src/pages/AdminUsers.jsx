import { Container, VStack, Box, Text, Heading, Flex, Button, HStack, Input } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useUsers, useAddUser, useUpdateUser, useDeleteUser } from "../integrations/supabase";

const AdminUsers = () => {
  const navigate = useNavigate();
  
  const { data: users, isLoading, isError } = useUsers();
  const addUserMutation = useAddUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const [editUserId, setEditUserId] = useState(null);
  const [editUserName, setEditUserName] = useState("");

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditUserName(user.name);
  };

  const handleSave = () => {
    updateUserMutation.mutate({ id: editUserId, name: editUserName });
    setEditUserId(null);
    setEditUserName("");
  };

  const handleDelete = (userId) => {
    deleteUserMutation.mutate(userId);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading users</Text>;
  }

  return (
    <Container maxW="container.lg" p={4}>
      <VStack spacing={8} align="stretch">
        <Flex as="nav" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
          <Heading size="lg">Manage Users</Heading>
        </Flex>
        
        <Button colorScheme="blue" onClick={() => navigate(-1)}>Back</Button>

        <Box as="main">
          <VStack spacing={4}>
            {users.map((user) => (
              <Box key={user.id} w="100%" p={4} borderWidth="1px" borderRadius="lg">
                {editUserId === user.id ? (
                  <HStack>
                    <Input
                      value={editUserName}
                      onChange={(e) => setEditUserName(e.target.value)}
                    />
                    <Button colorScheme="blue" onClick={handleSave}>Save</Button>
                  </HStack>
                ) : (
                  <Text>{user.name}</Text>
                )}
                <HStack mt={2}>
                  <Button size="sm" colorScheme="yellow" onClick={() => handleEdit(user)}>Edit</Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDelete(user.id)}>Delete</Button>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default AdminUsers;