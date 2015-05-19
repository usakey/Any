import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Searcher {
	private DAO dao;
	private DAO dao2 ;
	private Statement st;
	private Statement st2;
	private int tablenumber;
	public static void main(String args[]) throws Exception{
		Searcher searcher = new Searcher() ;
		ResultSet rs =null;
		ResultSet rs2 =null;
		try {
			rs = searcher.getMatchedResult("zhang") ;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int num = searcher.tablenumber+1 ;
		while(rs.next()){
			String urlid = rs.getString(1) ;
			String url = searcher.getURL(urlid, searcher.st2) ;
			System.out.print(url +" : ") ;
			int i;
			for(i=2;i<=num;i++){
				System.out.print(rs.getString(i));
			}
			System.out.println();
		}
		
		searcher.dao.conn.close();
		searcher.dao2.conn.close();
		
	}

	
	public String getURL(String urlid, Statement st) throws SQLException{
		String url;
		ResultSet rs = st.executeQuery("select url from urlist where id='" +urlid +"'") ;
		rs.next();
		return rs.getString("url") ;
	}
	
	public Searcher() {
		dao = new DAO();
		dao2 = new DAO() ;
		try {
			st = dao.conn.createStatement();
			st2 = dao2.conn.createStatement();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public ResultSet getMatchedResult(String query) throws Exception {

		// Strings to build the query
		String fieldlist = "w0.urlid";
		String tablelist = "";
		String clauselist = "";
		// wordids=[];
		// Split the words by spaces

		String words[] = query.split(" ");
		
		tablenumber = 0;
		int i;
//		List<String> wordids = new ArrayList<String>();
		for (i = 0; i < words.length; i++) {
			String word = words[i];
			// Get the word ID
			ResultSet rs;

			rs = st.executeQuery("select id from wordlist where word=" + "'"
					+ word + "'");

			if (rs.first() == true) {
				String wordid = rs.getString("id");
				if (tablenumber > 0) {
					tablelist += ",";
					clauselist += " and ";
					clauselist += "w" + (tablenumber - 1) + ".urlid=w"
							+ tablenumber + ".urlid and "; // %
															// (tablenumber-1,tablenumber);}
				}
				fieldlist += ",w" + tablenumber + ".location";
				tablelist += "wordlocation w" + tablenumber;// %d' % tablenumber
															// ;
				clauselist += "w" + tablenumber + ".wordid=" + wordid;// %d' %
																		// (tablenumber,wordid)
																		// ;
				tablenumber += 1;
			}
		}
		// Create the query from the separate parts
		String fullquery = "select " + fieldlist + " from " + tablelist
				+ " where " + clauselist + ";";
//		System.out.println(fullquery);
		return st.executeQuery(fullquery) ;
//		return null;
	}
}
