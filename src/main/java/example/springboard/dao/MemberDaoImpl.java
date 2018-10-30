package example.springboard.dao;

import example.springboard.dto.Member;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.Collections;
import java.util.Map;

@Repository
public class MemberDaoImpl implements MemberDao {
    private NamedParameterJdbcTemplate jdbcTemplate;
    private SimpleJdbcInsert jdbcInsert;

    // Constructor Injection
    public MemberDaoImpl(DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
        this.jdbcInsert = new SimpleJdbcInsert(dataSource)
                            .withTableName("member")
                            .usingGeneratedKeyColumns("id");
    }

    @Override
    public int insertMember(Member member) {
        SqlParameterSource params = new BeanPropertySqlParameterSource(member);
        return jdbcInsert.executeAndReturnKey(params).intValue();
    }

    @Override
    public String selectNameById(Long id) {
        String sql = "SELECT name FROM member WHERE id = :member_id";
        try {
            Map<String, ?> params = Collections.singletonMap("member_id", id);
            return jdbcTemplate.queryForObject(sql, params, String.class);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public String selectPasswordByName(String name) {
        String sql = "SELECT password FROM member WHERE name = :name";
        try{
            // Board에 값을 담아주는 규칙을 가지고 있는 RowMapper를 만든다.
            // Board.class정보를 읽어들여서 프로퍼티의 이름을 가지고 칼럼에 담아주는 규칙을 만든다.
            // readCount라는 프로퍼티가 있으면 read_count라는 칼럼의 값을 담아준다.
            Map<String, ?> params = Collections.singletonMap("name", name);
            // 한건 or null 을 조회할 때는 queryForObject
            // 첫번째 파라미터 : sql
            // 두번째 파라미터 : 바인딩할 Map
            // 세번째 파라미터 : Mapper (칼럼을 DTO에 담아주기위한 규칙)
            return jdbcTemplate.queryForObject(sql, params, String.class);
        }catch(Exception ex){
            return null;
        }
    }

    @Override
    public Member selectMemberByName(String name) {
        String sql = "SELECT id, name, email, password FROM member WHERE name = :name";
        try {
            RowMapper<Member> rowMapper = BeanPropertyRowMapper.newInstance(Member.class);
            Map<String, ?> params = Collections.singletonMap("name", name);

            return jdbcTemplate.queryForObject(sql, params, rowMapper);
        } catch(Exception ex){
            return null;
        }
    }
}
