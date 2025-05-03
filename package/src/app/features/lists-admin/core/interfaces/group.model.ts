// Data Transfer Object for Group
export interface GroupDTO {
    id: string;
    name: string;
  }
  
  // Request to create a new group
  export interface CreateGroupRequestDTO {
    name: string;
  }
  
  // Request to delete a group by ID
  export interface DeleteGroupRequestDTO {
    id: string;
  }
  