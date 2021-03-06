package example.springboard.service;

import example.springboard.dto.Comment;
import example.springboard.dto.Member;

import java.util.List;

public interface CommentService {
    Comment addComment(Comment comment);
    Comment addRecomment(Comment comment);
//    public Comment getComment(Long id);
    List<Comment> getComments(Long boardId);
    Comment updateComment(Comment comment);
    int deleteComment(Long id);
    int getChildCommentCount(Long id);
}
