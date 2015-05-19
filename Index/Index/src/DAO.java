import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DAO {
	public Connection conn;
	public Statement st;
	public DAO(){
		conn = getConnection();
		try {
			conn.setAutoCommit(false);
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try {
			st = (Statement) conn.createStatement();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
//		creatTables();
		// String url =
		// "D:\\My Documents\\eclipse_workspace\\Index\\data\\multiType\\CV_ENSTA_MengmengZHANG.pdf";
		// WordList.getDistinctWordList(url);
	}

	public static Connection getConnection() {
		Connection con = null; // 创建用于连接数据库的Connection对象
		try {
			Class.forName("com.mysql.jdbc.Driver");// 加载Mysql数据驱动

			con = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/zmm", "root", "mysqladmin");// 创建数据连接

		} catch (Exception e) {
			System.out.println("数据库连接失败" + e.getMessage());
		}
		return con; // 返回所建立的数据库连接
	}

	public void creatTables() {
		String createString;
		createString = "create table wordlocation ("
				+ "id int(20) auto_increment not null primary key,"
				+ "urlid int(10) not null," + "wordid int(10) not null,"
				+ "location int(10) not null" + ")";
//		createString = "create table wordlist ("
//				+ "id int(10) auto_increment not null primary key,"
//				+ "word varchar(30) not null" 
//				+ ")";	
//		createString = "create table urlist ("
//				+ "id int(10) auto_increment not null primary key,"
//				+ "url varchar(200) not null" 
//				+ ")";	

		try {
//			st = conn.createStatement();
			st.executeUpdate(createString);
//			st.close();
//			conn.close();

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

}
