import static org.junit.Assert.*;

import java.io.File;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;

import org.junit.Ignore;
import org.junit.Test;

public class TestIndexer {

	@Test
	public void testIndexingTxt() {
		String directory = "data/txt";
		List<File> files = Indexer.scanFile(new File(directory));
		Iterator<File> iter = files.iterator();
		Indexer indexer = new Indexer();
		while (iter.hasNext()) {
			String url = iter.next().toString().replaceAll("\\\\", "/");
			try {
				indexer.addtoindex(url);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		try {
			indexer.dao.conn.commit();
			indexer.dao.conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Test
	public void testIndexingTika() {
		File root = new File("data/multiType/test");
		List<File> files = Indexer.scanFile(root);
		for (File file : files) {
			System.out.println(file.getName() + ":");
			System.out.println(TikaReader.getContent(file));
			System.out.println();
		}
	}
}
