/**
 * Export Service
 * PDF and Excel export functionality
 */

const path = require('path');
const fs = require('fs');

class ExportService {
  constructor() {
    this.exportDir = path.join(__dirname, '../exports');
    this.ensureExportDir();
  }

  ensureExportDir() {
    if (!fs.existsSync(this.exportDir)) {
      fs.mkdirSync(this.exportDir, { recursive: true });
    }
  }

  generateFileName(type, prefix = 'export') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `${prefix}_${timestamp}.${type}`;
  }

  async exportToPDF(data, filename) {
    try {
      // In production, would use pdfkit
      // const PDFDocument = require('pdfkit');
      // const doc = new PDFDocument();

      const filepath = path.join(this.exportDir, filename);

      // Simulate PDF creation
      const content = JSON.stringify(data, null, 2);
      fs.writeFileSync(filepath, content);

      console.log(`PDF exported to ${filepath}`);

      return {
        success: true,
        filename,
        filepath,
        size: fs.statSync(filepath).size,
      };
    } catch (error) {
      console.error('PDF export error:', error);
      return { success: false, error: error.message };
    }
  }

  async exportToExcel(data, filename) {
    try {
      // In production, would use xlsx
      // const XLSX = require('xlsx');
      // const ws = XLSX.utils.json_to_sheet(data);
      // const wb = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      // XLSX.writeFile(wb, filepath);

      const filepath = path.join(this.exportDir, filename);

      // Simulate Excel creation
      const content = JSON.stringify(data, null, 2);
      fs.writeFileSync(filepath, content);

      console.log(`Excel exported to ${filepath}`);

      return {
        success: true,
        filename,
        filepath,
        size: fs.statSync(filepath).size,
      };
    } catch (error) {
      console.error('Excel export error:', error);
      return { success: false, error: error.message };
    }
  }

  async exportMembersReport(members) {
    try {
      const filename = this.generateFileName('xlsx', 'members_report');
      return await this.exportToExcel(members, filename);
    } catch (error) {
      console.error('Members report error:', error);
      return { success: false, error: error.message };
    }
  }

  async exportLoansReport(loans) {
    try {
      const filename = this.generateFileName('xlsx', 'loans_report');
      return await this.exportToExcel(loans, filename);
    } catch (error) {
      console.error('Loans report error:', error);
      return { success: false, error: error.message };
    }
  }

  async exportContributionsReport(contributions) {
    try {
      const filename = this.generateFileName('xlsx', 'contributions_report');
      return await this.exportToExcel(contributions, filename);
    } catch (error) {
      console.error('Contributions report error:', error);
      return { success: false, error: error.message };
    }
  }

  async exportFinancialStatement(data) {
    try {
      const filename = this.generateFileName('pdf', 'financial_statement');
      return await this.exportToPDF(data, filename);
    } catch (error) {
      console.error('Financial statement error:', error);
      return { success: false, error: error.message };
    }
  }

  async exportMemberStatement(memberId, data) {
    try {
      const filename = this.generateFileName('pdf', `member_${memberId}_statement`);
      return await this.exportToPDF(data, filename);
    } catch (error) {
      console.error('Member statement error:', error);
      return { success: false, error: error.message };
    }
  }

  async getExportFile(filename) {
    try {
      const filepath = path.join(this.exportDir, filename);

      if (!fs.existsSync(filepath)) {
        return { success: false, error: 'File not found' };
      }

      return {
        success: true,
        filepath,
        filename,
        size: fs.statSync(filepath).size,
      };
    } catch (error) {
      console.error('Get export file error:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteExportFile(filename) {
    try {
      const filepath = path.join(this.exportDir, filename);

      if (!fs.existsSync(filepath)) {
        return { success: false, error: 'File not found' };
      }

      fs.unlinkSync(filepath);

      return { success: true, message: 'File deleted successfully' };
    } catch (error) {
      console.error('Delete export file error:', error);
      return { success: false, error: error.message };
    }
  }

  async listExportFiles() {
    try {
      const files = fs.readdirSync(this.exportDir);
      const fileDetails = files.map((file) => {
        const filepath = path.join(this.exportDir, file);
        const stats = fs.statSync(filepath);
        return {
          filename: file,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime,
        };
      });

      return { success: true, files: fileDetails };
    } catch (error) {
      console.error('List export files error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new ExportService();

