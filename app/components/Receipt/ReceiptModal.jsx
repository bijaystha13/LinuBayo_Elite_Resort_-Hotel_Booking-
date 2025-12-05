import React, { useRef, useEffect, useState } from "react";
import {
  X,
  Download,
  Printer,
  MapPin,
  Calendar,
  Users,
  Hotel,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import styles from "./Receiptmodal.module.css";

const ReceiptModal = ({ booking, onClose }) => {
  const printRef = useRef();
  const [isClosing, setIsClosing] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on Browser Back Button
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      handleClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const win = window.open("", "", "width=900,height=650");
    win.document.write(`
      <html>
        <head>
          <title>Receipt - ${booking.id}</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              padding: 2rem;
              color: #1e293b;
            }
            h2 { color: #667eea; margin-bottom: 1rem; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
            .info-item { padding: 0.75rem; background: #f8fafc; border-radius: 8px; }
            .label { font-weight: 600; color: #64748b; font-size: 0.875rem; margin-bottom: 0.25rem; }
            .value { color: #1e293b; font-size: 1rem; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  const handleDownloadPDF = () => {
    const element = printRef.current;
    const opt = {
      margin: 0.5,
      filename: `Receipt-${booking.id}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    window.html2pdf().from(element).set(opt).save();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className={`${styles.modalOverlay} ${isClosing ? styles.closing : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.modalClosing : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerContent}>
            <div className={styles.successIcon}>
              <CheckCircle className={styles.checkIcon} />
            </div>
            <div>
              <h2 className={styles.modalTitle}>Booking Confirmed!</h2>
              <p className={styles.modalSubtitle}>
                Your reservation has been successfully processed
              </p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={handleClose}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        {/* Receipt Content */}
        <div className={styles.modalContent} ref={printRef}>
          {/* Hotel Info */}
          <div className={styles.hotelSection}>
            <div className={styles.hotelIcon}>🏨</div>
            <div>
              <h3 className={styles.hotelName}>{booking.hotelName}</h3>
              <div className={styles.locationWrapper}>
                <MapPin className={styles.locationIcon} />
                <span className={styles.location}>{booking.location}</span>
              </div>
            </div>
          </div>

          {/* Booking ID Badge */}
          <div className={styles.bookingIdSection}>
            <span className={styles.bookingIdLabel}>Booking ID</span>
            <span className={styles.bookingId}>{booking.id}</span>
          </div>

          {/* Booking Details Grid */}
          <div className={styles.detailsGrid}>
            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>
                <Calendar className={styles.icon} />
              </div>
              <div>
                <p className={styles.detailLabel}>Check-in</p>
                <p className={styles.detailValue}>
                  {formatDate(booking.checkIn)}
                </p>
              </div>
            </div>

            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>
                <Calendar className={styles.icon} />
              </div>
              <div>
                <p className={styles.detailLabel}>Check-out</p>
                <p className={styles.detailValue}>
                  {formatDate(booking.checkOut)}
                </p>
              </div>
            </div>

            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>
                <Users className={styles.icon} />
              </div>
              <div>
                <p className={styles.detailLabel}>Guests</p>
                <p className={styles.detailValue}>{booking.guests} Guests</p>
              </div>
            </div>

            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>
                <Hotel className={styles.icon} />
              </div>
              <div>
                <p className={styles.detailLabel}>Room Type</p>
                <p className={styles.detailValue}>{booking.roomType}</p>
              </div>
            </div>
          </div>

          {/* Total Price Section */}
          <div className={styles.totalSection}>
            <div className={styles.totalContent}>
              <DollarSign className={styles.dollarIcon} />
              <div>
                <p className={styles.totalLabel}>Total Amount</p>
                <p className={styles.totalPrice}>${booking.totalPrice}</p>
              </div>
            </div>
            <div className={styles.paidBadge}>
              <CheckCircle className={styles.paidIcon} />
              Paid
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.modalActions}>
          <button className={styles.downloadBtn} onClick={handleDownloadPDF}>
            <Download className={styles.btnIcon} />
            Download PDF
          </button>
          <button className={styles.printBtn} onClick={handlePrint}>
            <Printer className={styles.btnIcon} />
            Print Receipt
          </button>
        </div>

        {/* Footer Note */}
        <div className={styles.modalFooter}>
          <p className={styles.footerText}>
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
