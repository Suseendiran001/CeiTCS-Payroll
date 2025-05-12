
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Upload, X } from 'lucide-react';

const ComplianceDocuments = () => {
  // Sample data - in a real application, this would come from your API
  const documents = [
    { 
      id: 1, 
      name: 'PF Registration Certificate', 
      description: 'Certificate of registration under EPF Act', 
      status: 'valid',
      expiryDate: 'N/A',
      uploadedOn: 'Jan 15, 2022',
      fileType: 'PDF'
    },
    { 
      id: 2, 
      name: 'ESI Registration', 
      description: 'Certificate of registration under ESI Act', 
      status: 'valid',
      expiryDate: 'N/A',
      uploadedOn: 'Jan 15, 2022',
      fileType: 'PDF'
    },
    { 
      id: 3, 
      name: 'GST Registration', 
      description: 'Registration certificate under GST', 
      status: 'valid',
      expiryDate: 'N/A',
      uploadedOn: 'Feb 10, 2022',
      fileType: 'PDF'
    },
    { 
      id: 4, 
      name: 'Professional Tax Registration', 
      description: 'Registration certificate for Professional Tax', 
      status: 'valid',
      expiryDate: 'N/A',
      uploadedOn: 'Mar 5, 2022',
      fileType: 'PDF'
    },
    { 
      id: 5, 
      name: 'Trade License', 
      description: 'Business operation license', 
      status: 'expiring',
      expiryDate: 'May 30, 2023',
      uploadedOn: 'Jun 12, 2022',
      fileType: 'PDF'
    },
    { 
      id: 6, 
      name: 'Labor License', 
      description: 'License under labor laws', 
      status: 'missing',
      expiryDate: 'N/A',
      uploadedOn: 'N/A',
      fileType: 'N/A'
    },
    { 
      id: 7, 
      name: 'Fire Safety Certificate', 
      description: 'Certificate from fire department', 
      status: 'expired',
      expiryDate: 'Mar 31, 2023',
      uploadedOn: 'Apr 10, 2022',
      fileType: 'PDF'
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'valid':
        return <Badge className="bg-green-100 text-green-800">Valid</Badge>;
      case 'expiring':
        return <Badge className="bg-yellow-100 text-yellow-800">Expiring Soon</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case 'missing':
        return <Badge className="bg-gray-100 text-gray-800">Missing</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="table-header">Document</th>
            <th className="table-header hidden lg:table-cell">Description</th>
            <th className="table-header hidden md:table-cell">Uploaded</th>
            <th className="table-header hidden md:table-cell">Expiry</th>
            <th className="table-header">Status</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {documents.map((document) => (
            <tr key={document.id}>
              <td className="table-cell">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-medium">{document.name}</span>
                </div>
              </td>
              <td className="table-cell hidden lg:table-cell">{document.description}</td>
              <td className="table-cell hidden md:table-cell">{document.uploadedOn}</td>
              <td className="table-cell hidden md:table-cell">{document.expiryDate}</td>
              <td className="table-cell">{getStatusBadge(document.status)}</td>
              <td className="table-cell">
                <div className="flex items-center gap-2">
                  {document.status !== 'missing' ? (
                    <>
                      <Button size="icon" variant="ghost" title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" title="Download">
                        <Download className="h-4 w-4" />
                      </Button>
                      {document.status === 'expired' && (
                        <Button size="icon" variant="ghost" title="Upload New">
                          <Upload className="h-4 w-4" />
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button size="sm" className="bg-primary-gradient">
                      <Upload className="mr-1 h-3 w-3" />
                      <span>Upload</span>
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplianceDocuments;
