package example.springboard.dao;

import example.springboard.dto.Board;
import example.springboard.dto.BoardBody;

import java.util.List;

public interface BoardDao {
    List<Board> selectBoardListAll(Long categoryId);
    List<Board> selectBoardListByMember(Long categoryId, Long memberId);
    List<Board> selectBoardListByTitle(Long categoryId, String title);
    List<Board> selectBoardListByContent(Long categoryId, String content);
    List<Board> selectBoardListByTitleOrContent(Long categoryId, String titleOrContent);
    Board selectBoardDetail(Long id);
    Long insertBoard(Board board);
    int insertBoardBody(Long id, String content);
    int updateBoard(Board board);
    int updateBoardBody(String content, Long id);
//    int addBoardReply(Long id, Long originId, int depth, int replySeq, Long categoryId, Long memberId, String title, String ipAddr, Date regDate);

    Board getBoardInfoForReply(Long id);
    int updateBoardForReply(Board board);

    int deleteBoard(Long id);
}
