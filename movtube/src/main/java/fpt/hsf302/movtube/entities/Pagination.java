package fpt.hsf302.movtube.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Pagination {
    private int totalItems;
    private int totalPages;
    private int currentPage;
    private int itemsPerPage;
}
