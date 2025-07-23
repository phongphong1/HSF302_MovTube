package fpt.hsf302.movtube.repositories;

import fpt.hsf302.movtube.entities.UserRole;
import fpt.hsf302.movtube.entities.UserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleId> {
    List<UserRole> findByUser_Id(Integer userId);
}

