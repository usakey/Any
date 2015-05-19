import static org.junit.Assert.*;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.Token;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;
import org.apache.lucene.util.Version;
import org.junit.Ignore;
import org.junit.Test;

public class TestAnalyser {

	@Ignore @Test
	public void testStringReader() {
		@SuppressWarnings("deprecation")
		Analyzer aAnanyzer = new StandardAnalyzer(Version.LUCENE_CURRENT);

		Reader reader = new StringReader(
				"People are always talking about 'the problem of youth'.");

		TokenStream ts = null;
		List<String> wordlist = null;
		try {
			ts = aAnanyzer.tokenStream("body", reader);
			wordlist = listTokens(ts);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		WordList.show(wordlist);
	}
	
	@Test
	public void testReader() {
		@SuppressWarnings("deprecation")
		Analyzer aAnanyzer = new StandardAnalyzer(Version.LUCENE_CURRENT);
		File file = new File("data/multiType/RTF.rtf") ;
		Reader reader = TikaReader.getReader(file) ;

		TokenStream ts = null;
		List<String> wordlist = null;
		try {
			ts = aAnanyzer.tokenStream("body", reader);
			wordlist = listTokens(ts);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		WordList.show(wordlist);
	}

	public static List<String> listTokens(TokenStream ts) {
		List<String> wordlist = new ArrayList<String>();
		CharTermAttribute termAtt = ts.addAttribute(CharTermAttribute.class);
		try {
			ts.reset();
			while (ts.incrementToken()) {
				wordlist.add(termAtt.toString());
			}
			ts.end();
			ts.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return wordlist;
	}
}
