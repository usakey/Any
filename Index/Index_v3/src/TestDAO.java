import static org.junit.Assert.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.junit.Ignore;
import org.junit.Test;

public class TestDAO {

	@Ignore
	@Test
	public void testDBConnection() {
		DAO dao = new DAO();
		Connection conn = dao.getConnection();
		System.out.println(conn);
		dao.close();
	}

	@Ignore
	@Test
	public void testSelect() {
		DAO dao = new DAO();
		Connection conn = dao.getConnection();
		System.out.println(conn);
		Statement st = null;
		ResultSet rs = null;
		try {
			st = conn.createStatement();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		String sql = "select * from test2";
		try {
			rs = st.executeQuery(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		try {
			while (rs.next()) {
				System.out.println(rs.getString("id") + "  "
						+ rs.getString("name"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		dao.close();
	}
	
	@Ignore
	@Test
	public void testCreateTables() {
		DAO dao = new DAO();
		dao.creatTables(); 
		dao.close();
	}
}
