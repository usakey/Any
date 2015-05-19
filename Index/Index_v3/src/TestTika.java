import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.Reader;
import java.util.List;

import org.apache.tika.Tika;
import org.apache.tika.metadata.HttpHeaders;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.sax.BodyContentHandler;
import org.junit.Ignore;
import org.junit.Test;

public class TestTika {

	@Ignore
	@Test
	public void testMetadata() throws Exception {

		File file = new File("data/multiType/RTF.rtf");
		InputStream is = new FileInputStream(file);
		Metadata metadata = new Metadata();
		BodyContentHandler ch = new BodyContentHandler();
		AutoDetectParser parser = new AutoDetectParser();

		String mimeType = new Tika().detect(file);
		metadata.set(HttpHeaders.CONTENT_TYPE, mimeType);

		parser.parse(is, ch, metadata, new ParseContext());
		is.close();

		for (int i = 0; i < metadata.names().length; i++) {
			String item = metadata.names()[i];
			System.out.println(item + " -- " + metadata.get(item));
		}

		System.out.println(ch.toString());
	}

	@Ignore @Test
	public void testReadingContent() throws Exception {

		File root = new File("data/multiType");
		List<File> files = Indexer.scanFile(root);
		for (File file : files) {
			InputStream is = new FileInputStream(file);
			Metadata metadata = new Metadata();
			BodyContentHandler ch = new BodyContentHandler();
			AutoDetectParser parser = new AutoDetectParser();

			String mimeType = new Tika().detect(file);
			metadata.set(HttpHeaders.CONTENT_TYPE, mimeType);

			parser.parse(is, ch, metadata, new ParseContext());
			is.close();
			
			Reader reader = new Tika().parse(new File("data/multiType/RTF.rtf")) ;
			
			System.out.println(file.getName() + ":");
			System.out.println(ch.toString());
			System.out.println();
		}
	}

	@Ignore @Test
	public void testGetContent() throws Exception {

		File root = new File("data/multiType");
		List<File> files = Indexer.scanFile(root);
		for (File file : files) {
			System.out.println(file.getName() + ":");
			System.out.println(TikaReader.getContent(file));
			System.out.println();
		}
	}
}
