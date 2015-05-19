import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DAO {
	public Connection conn;
	public DAO(){
		conn = getConnection();
		try {
			conn.setAutoCommit(false);
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	}

	public Connection getConnection() {
		if(conn!=null){return conn ;}
		Connection con = null; 
		try {
			Class.forName("org.postgresql.Driver");

			con = DriverManager.getConnection(
					"jdbc:postgresql://localhost:5432/index", "postgres", "postgres");

		} catch (Exception e) {
			System.out.println("Error get connection" + e.getMessage());
		}
		return con; 
	}

	public void creatTables() {
		String createString1 = "create table wordlocation ("
				+ "id serial not null primary key,"
				+ "urlid integer not null," + "wordid integer not null,"
				+ "location integer not null" + ");";
		String createString2 = "create table wordlist ("
				+ "id serial not null primary key,"
				+ "word varchar(30) not null" 
				+ ");";	
		String createString3 = "create table urlist ("
				+ "id serial not null primary key,"
				+ "url varchar(200) not null" 
				+ ");";	

		try {
			Statement st = conn.createStatement();
			st.executeUpdate(createString1);
			st.executeUpdate(createString2);
			st.executeUpdate(createString3);
			conn.commit(); 

		} catch (SQLException ex) {
			System.err.println("SQLException: " + ex.getMessage());
		}
		System.out.println("Table Created");

	}

	public String getentryid(String table, String field, String value) {
		
		String entryid = null;
		String sql = "SELECT * FROM " + table + " WHERE " + field + "='"
				+ value + "'";

		ResultSet rs;
		try {
			Statement st = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY) ; 
			rs = st.executeQuery(sql);

			if (!rs.first()) {
				sql = "INSERT INTO " + table + " (" + field + ") values ("
						+ "'" + value + "')";
				st.execute(sql);
//				st.close();
//				conn.close();
				return getentryid(table, field, value);
			} else {
				entryid = rs.getString("id");
			}

//			st.close();
//			conn.close(); // 关闭数据库连接
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return entryid;

	}
	
	public void close(){
		try {
			conn.close() ;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
