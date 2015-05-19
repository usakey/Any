import java.io.File;
import java.io.FileFilter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Indexer {
	DAO dao;
//	private String[] ignoreWords = { "is", "a" };
//	private List<String> ignoreWordsList = new ArrayList<String>();

	public Indexer() {
//		ignoreWordsList.add("is");
//		ignoreWordsList.add("a");
//		ignoreWordsList.add("an");
		dao = new DAO();
	}

	public static void main(String[] args) {

	}

	// Index an individual page
	public void addtoindex(String url) {

		if (isIndexed(url))
			return;
		System.out.println("Indexing " + url);
		// Get the individual words
		List<String> words = WordList.getWordListFromFile(url);
		// Get the URL id
		String urlid = dao.getentryid("urlist", "url", url);
		// Link each word to this url
		Iterator<String> itr = words.iterator();
		int pos = 1;
		while (itr.hasNext()) {
			String word = itr.next();
			String wordid = dao.getentryid("wordlist", "word", word);
			String sql = "INSERT INTO wordlocation (urlid,wordid,location) values ("
					+ urlid + "," + wordid + "," + pos + ")";
			try { 
				Statement st = dao.conn.createStatement() ;
				st.executeUpdate(sql);
			} catch (SQLException ex) {
				System.err.println("SQLException: " + ex.getMessage());
			}
			pos++;
		}
	}

	// Index an individual page
		public void addtoindex(String url, List<String> words) {
			if (isIndexed(url))
				return;
			System.out.println("Indexing " + url);
			// Get the URL id
			String urlid = dao.getentryid("urlist", "url", url);
			// Link each word to this url
			Iterator<String> itr = words.iterator();
			int pos = 1;
			while (itr.hasNext()) {
				String word = itr.next();
				String wordid = dao.getentryid("wordlist", "word", word);
				String sql = "INSERT INTO wordlocation (urlid,wordid,location) values ("
						+ urlid + "," + wordid + "," + pos + ")";
				try { 
					Statement st = dao.conn.createStatement() ;
					st.executeUpdate(sql);
				} catch (SQLException ex) {
					System.err.println("SQLException: " + ex.getMessage());
				}
				pos++;
			}
		}

	
	public boolean isIndexed(String url) {
		String sql = "SELECT id from  urlist where url='" +url+ "'" ;
		boolean flag = false;
		try {
			Statement st = dao.conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY) ;
			ResultSet rs = st.executeQuery(sql) ;
			flag = rs.first() ;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return flag ;
	}

	public static List<File> scanFile(File root) {
		List<File> fileInfo = new ArrayList<File>();

		File[] files = root.listFiles(new FileFilter() {
			public boolean accept(File pathname) {
				if (pathname.isDirectory() && pathname.isHidden()) { // 去掉隐藏文件夹
					return false;
				}

				if (pathname.isFile() && pathname.isHidden()) {// 去掉隐藏文件
					return false;
				}
				return true;
			}
		});
		for (File file : files) {// 逐个遍历文件
			if (file.isDirectory()) { // 如果是文件夹，则进一步遍历，属于递归算法
				List<File> ff = scanFile(file);
				fileInfo.addAll(ff);
			} else {
				fileInfo.add(file); // 如果不是文件夹，则添加入文件列表
			}
		}

		return fileInfo;
	}
}
