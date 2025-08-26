import fs from 'fs';
import path from 'path';

function generateProjectSummary(dir, indent = '') {
  const items = fs.readdirSync(dir);
  let summary = '';

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other unnecessary directories
      if (['node_modules', 'dist', 'build', '.git'].includes(item)) return;
      
      summary += `${indent}📁 ${item}\n`;
      summary += generateProjectSummary(fullPath, indent + '  ');
    } else {
      const ext = path.extname(item);
      let icon = '📄';
      
      if (ext === '.js' || ext === '.jsx') icon = '⚛️';
      else if (ext === '.css') icon = '🎨';
      else if (ext === '.html') icon = '🌐';
      else if (ext === '.json') icon = '📋';
      
      summary += `${indent}${icon} ${item}\n`;
    }
  });
  
  return summary;
}

// Save the summary to a file
const summary = `# Project Structure Summary\n\n${generateProjectSummary('.')}`;
fs.writeFileSync('PROJECT_SUMMARY.md', summary);
console.log('Project summary generated as PROJECT_SUMMARY.md');
